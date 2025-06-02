"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const divVariants = {
  hover: { scale: 1.05, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.02, ease: "linear" },
  },
};

const page = () => {
  const router = useRouter();
  return (
    <>
      <div className="text-shadow-white text-bold text-4xl text-center  bg-blue-900 pt-4">
        🎓 Student Dashboard
      </div>
      <div className="h-60 flex items bg-blue-900 gap-4 px-3 py-4">
        <motion.div
          variants={divVariants}
          onClick={() => router.push("/home")}
          whileHover="hover"
          whileTap="tap"
          transition={{ type: "spring", stiffness: 300 }}
          className="w-full text-xl cursor-pointer text-center font-bold bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 
                       transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 h-50"
        >
          THIS IS US
        </motion.div>
        <motion.div
          variants={divVariants}
          onClick={() => router.push("/home")}
          whileHover="hover"
          whileTap="tap"
          transition={{ type: "spring", stiffness: 300 }}
          className="w-full opacity-50 text-xl cursor-pointer text-center font-bold bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 
                       transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 h-50"
        >
          LESSONS
        </motion.div>
        <motion.div
          variants={divVariants}
          onClick={() => router.push("/home")}
          whileHover="hover"
          whileTap="tap"
          transition={{ type: "spring", stiffness: 300 }}
          className="w-full text-xl cursor-pointer text-center font-bold bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 
                       transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 h-50"
        >
          TEACHER'S GUIDE
        </motion.div>
      </div>
      <div className="h-60 flex items bg-blue-900 gap-4 px-3 py-4">
        <motion.div
          variants={divVariants}
          onClick={() => router.push("/home")}
          whileHover="hover"
          whileTap="tap"
          transition={{ type: "spring", stiffness: 300 }}
          className="w-full text-xl opacity-50 cursor-pointer text-center font-bold bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 
                       transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 h-50"
        >
          THIS IS US
        </motion.div>
        <motion.div
          variants={divVariants}
          onClick={() => router.push("/home")}
          whileHover="hover"
          whileTap="tap"
          transition={{ type: "spring", stiffness: 300 }}
          className="w-full text-xl cursor-pointer text-center font-bold bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 
                       transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 h-50"
        >
          LESSONS
        </motion.div>
        <motion.div
          variants={divVariants}
          onClick={() => router.push("/home")}
          whileHover="hover"
          whileTap="tap"
          transition={{ type: "spring", stiffness: 300 }}
          className="w-full text-xl opacity-50 cursor-pointer text-center font-bold bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 
                       transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 h-50"
        >
          TEACHER'S GUIDE
        </motion.div>
      </div>
      <div className="h-70 flex items bg-blue-900 gap-4 px-3 py-4">
        <motion.div
          variants={divVariants}
          onClick={() => router.push("/home")}
          whileHover="hover"
          whileTap="tap"
          transition={{ type: "spring", stiffness: 300 }}
          className="w-full text-xl cursor-pointer text-center font-bold bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 
                       transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 h-50"
        >
          THIS IS US
        </motion.div>
        <motion.div
          variants={divVariants}
          onClick={() => router.push("/home")}
          whileHover="hover"
          whileTap="tap"
          transition={{ type: "spring", stiffness: 300 }}
          className="w-full text-xl opacity-50  cursor-pointer text-center font-bold bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 
                       transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 h-50"
        >
          LESSONS
        </motion.div>
        <motion.div
          variants={divVariants}
          onClick={() => router.push("/home")}
          whileHover="hover"
          whileTap="tap"
          transition={{ type: "spring", stiffness: 300 }}
          className="w-full text-xl cursor-pointer text-center font-bold bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 
                       transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 h-50"
        >
          TEACHER'S GUIDE
        </motion.div>
      </div>
    </>
  );
};

export default page;
