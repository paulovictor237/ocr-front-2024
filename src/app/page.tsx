'use client';
import dynamic from 'next/dynamic';

export default dynamic(
  // () => import('@/modules/Canvas').then((module) => module.Canvas),
  // () => import('@/modules/App').then((module) => module.Canvas),
  () => import('@/modules/master').then((module) => module.Master),
  { ssr: false }
);
