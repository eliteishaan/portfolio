import * as THREE from 'three'

export const setupArtifactScene = () => {
  // Primitives to maintain under 2MB constraint
  const geometries = {
    bgPlane: new THREE.PlaneGeometry(16, 10),
    dataLayer: new THREE.PlaneGeometry(7, 4),
    card: new THREE.BoxGeometry(2, 1.2, 0.05),
    screen: new THREE.PlaneGeometry(8, 5),
    bezel: new THREE.BoxGeometry(8.2, 5.2, 0.2),
    micro: new THREE.BoxGeometry(0.4, 0.4, 0.05),
  }

  // Matte and reflective materials per spec
  const materials = {
    bgPlane: new THREE.MeshStandardMaterial({
      color: 0x050505,
      roughness: 1,
      metalness: 0,
      transparent: true,
      opacity: 0.8,
    }),
    dataLayer: new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.9,
      metalness: 0,
      transparent: true,
      opacity: 0.6,
    }),
    card: new THREE.MeshStandardMaterial({
      color: 0x1a1a1c,
      roughness: 0.8,
      metalness: 0.1,
    }),
    screen: new THREE.MeshStandardMaterial({
      color: 0x222222,
      roughness: 0.9,
      metalness: 0,
    }),
    bezel: new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.5,
      metalness: 0.15,
    }),
    micro: new THREE.MeshStandardMaterial({
      color: 0xe8a73d,
      emissive: 0xe8a73d,
      emissiveIntensity: 0.2,
      roughness: 0.2,
      metalness: 0.8,
    }),
  }

  return { geometries, materials }
}
