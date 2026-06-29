'use client'

import React from 'react'
import { View } from '@react-three/drei'
import { ReactiveMeshScene } from './ReactiveMeshScene'

export const HeroCanvasView = () => {
  return (
    <View className="h-full w-full">
      <ReactiveMeshScene />
    </View>
  )
}
