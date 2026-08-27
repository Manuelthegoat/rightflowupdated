import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function rnd(a, b) {
  return a + Math.random() * (b - a)
}

function Chain3D() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    const reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches

    const scene = new THREE.Scene()
    const FOV = 42,
      CAMZ = 16
    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100)
    camera.position.set(0, 0, CAMZ)

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    } catch (e) {
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75))
    renderer.setClearColor(0x000000, 0)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05
    mount.appendChild(renderer.domElement)

    function makeEnv() {
      const c = document.createElement('canvas')
      c.width = 16
      c.height = 128
      const g = c.getContext('2d')
      const grd = g.createLinearGradient(0, 0, 0, 128)
      grd.addColorStop(0.0, '#454c59')
      grd.addColorStop(0.42, '#c2c9d4')
      grd.addColorStop(0.5, '#ffffff')
      grd.addColorStop(0.58, '#9aa2ad')
      grd.addColorStop(1.0, '#0a0d12')
      g.fillStyle = grd
      g.fillRect(0, 0, 16, 128)
      const tex = new THREE.CanvasTexture(c)
      tex.mapping = THREE.EquirectangularReflectionMapping
      const pmrem = new THREE.PMREMGenerator(renderer)
      const env = pmrem.fromEquirectangular(tex).texture
      tex.dispose()
      pmrem.dispose()
      return env
    }
    scene.environment = makeEnv()
    const key = new THREE.DirectionalLight(0xffffff, 1.3)
    key.position.set(4, 6, 5)
    scene.add(key)
    const fill = new THREE.DirectionalLight(0xffffff, 0.5)
    fill.position.set(-5, -2, 3)
    scene.add(fill)
    const steel = new THREE.MeshStandardMaterial({
      color: 0xb9bdc4,
      metalness: 1.0,
      roughness: 0.33,
      envMapIntensity: 1.15,
    })

    const a = 0.1,
      b = 0.125,
      w = 0.05
    let LINKGEO
    {
      const seg = 14
      const pts = []
      let ang
      for (let i = 0; i < seg; i++) pts.push(new THREE.Vector3(-a + 2 * a * (i / seg), b, 0))
      for (let i = 0; i < seg; i++) {
        ang = Math.PI / 2 - Math.PI * (i / seg)
        pts.push(new THREE.Vector3(a + Math.cos(ang) * b, Math.sin(ang) * b, 0))
      }
      for (let i = 0; i < seg; i++) pts.push(new THREE.Vector3(a - 2 * a * (i / seg), -b, 0))
      for (let i = 0; i < seg; i++) {
        ang = -Math.PI / 2 - Math.PI * (i / seg)
        pts.push(new THREE.Vector3(-a + Math.cos(ang) * b, Math.sin(ang) * b, 0))
      }
      const curve = new THREE.CatmullRomCurve3(pts, true, 'catmullrom', 0.0)
      LINKGEO = new THREE.TubeGeometry(curve, 64, w, 7, true)
    }

    const COUNT = window.innerWidth < 768 ? 20 : 40
    const links = []
    for (let n = 0; n < COUNT; n++) {
      const m = new THREE.Mesh(LINKGEO, steel)
      const axis = new THREE.Vector3(rnd(-1, 1), rnd(-1, 1), rnd(-1, 1))
      if (axis.lengthSq() < 1e-4) axis.set(0, 1, 0)
      axis.normalize()
      m.scale.setScalar(rnd(0.65, 1.25))
      scene.add(m)
      links.push({
        mesh: m,
        nx: rnd(-1, 1),
        ny: rnd(-1, 1),
        z: rnd(-2.6, 1.2),
        axis,
        baseAng: rnd(0, Math.PI * 2),
        spin: (Math.random() < 0.5 ? -1 : 1) * rnd(0.12, 0.5),
        fax: rnd(0.25, 0.75),
        fpx: rnd(0, 6.28),
        fsx: (Math.random() < 0.5 ? -1 : 1) * rnd(0.25, 0.8),
        fay: rnd(0.25, 0.75),
        fpy: rnd(0, 6.28),
        fsy: (Math.random() < 0.5 ? -1 : 1) * rnd(0.25, 0.8),
        faz: rnd(0.15, 0.5),
        fpz: rnd(0, 6.28),
        fsz: rnd(0.2, 0.5),
        dx: 0,
        dy: 0,
        sp: 0,
      })
    }

    let halfH = Math.tan((FOV * Math.PI) / 360) * CAMZ,
      halfW = halfH
    function resize() {
      const w2 = window.innerWidth,
        h = window.innerHeight
      renderer.setSize(w2, h, false)
      camera.aspect = w2 / h
      camera.updateProjectionMatrix()
      halfH = Math.tan((FOV * Math.PI) / 360) * CAMZ
      halfW = halfH * camera.aspect
    }
    window.addEventListener('resize', resize)
    resize()

    const tgt = { x: 1e6, y: 1e6 },
      cur = { x: 1e6, y: 1e6 },
      RAD = 3.2,
      FORCE = 2.1
    function onMove(e) {
      const nx = (e.clientX / window.innerWidth) * 2 - 1,
        ny = -(e.clientY / window.innerHeight) * 2 + 1
      tgt.x = nx * halfW
      tgt.y = ny * halfH
    }
    function onLeave() {
      tgt.x = 1e6
      tgt.y = 1e6
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', onLeave)

    let last = 0
    let rafId
    function frame(t) {
      const time = t * 0.001
      const dt = Math.min(0.05, (t - last) / 1000) || 0.016
      last = t
      const curK = 1 - Math.pow(0.0009, dt)
      const dispK = 1 - Math.pow(0.00012, dt)
      cur.x += (tgt.x - cur.x) * curK
      cur.y += (tgt.y - cur.y) * curK

      for (let i = 0; i < links.length; i++) {
        const L = links[i]
        const bx = L.nx * halfW * 1.06 + L.fax * Math.sin(time * L.fsx + L.fpx)
        const by = L.ny * halfH * 1.06 + L.fay * Math.sin(time * L.fsy + L.fpy)
        const z = L.z + L.faz * Math.sin(time * L.fsz + L.fpz)

        let tx = 0,
          ty = 0,
          near = 0
        const ddx = bx - cur.x,
          ddy = by - cur.y,
          dist = Math.hypot(ddx, ddy)
        if (dist < RAD) {
          const u = 1 - dist / RAD
          const fall = u * u * (3 - 2 * u)
          const inv = 1 / (dist || 1e-3)
          tx = ddx * inv * FORCE * fall
          ty = ddy * inv * FORCE * fall
          near = fall
        }
        L.dx += (tx - L.dx) * dispK
        L.dy += (ty - L.dy) * dispK
        L.sp += (near * 2.2 - L.sp) * dispK

        L.mesh.position.set(bx + L.dx, by + L.dy, z)
        L.mesh.quaternion.setFromAxisAngle(L.axis, L.baseAng + time * (L.spin + L.sp))
      }
      renderer.render(scene, camera)
      if (!reduce) rafId = requestAnimationFrame(frame)
    }
    rafId = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
      links.forEach((L) => scene.remove(L.mesh))
      LINKGEO.dispose()
      steel.dispose()
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div className="chain3d" id="chain3d" aria-hidden="true" ref={mountRef}></div>
}

export default Chain3D