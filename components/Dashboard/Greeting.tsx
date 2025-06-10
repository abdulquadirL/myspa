// 'use client';

// import React from 'react';

// interface GreetingProps {
//   name: string;
// }

// export default function Greeting({ name }: GreetingProps) {
//   const getGreetingMessage = () => {
//     const hour = new Date().getHours();
//     if (hour < 12) return 'Good Morning';
//     if (hour < 18) return 'Good Afternoon';
//     return 'Good Evening';
//   };

//   return (
//     <div className="mb-6 text-2xl font-semibold text-gray-900 dark:text-amber-300">
//       {getGreetingMessage()}, <span className=" dark:text-amber-200">{name}</span>!
//     </div>
//   );
// }


"use client";

import { motion } from "framer-motion";

export default function Greeting({ name }: { name: string }) {
  return (
    <motion.h1
      className="text-2xl font-semibold text-emerald-700 dark:text-amber-300"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      Welcome back, {name} 👋
    </motion.h1>
  );
}

