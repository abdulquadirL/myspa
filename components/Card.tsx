import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

interface CardProps {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  activeCard: number | null;
  setActiveCard: (id: number | null) => void;
}


const Card: React.FC<CardProps> = ({
  id,
  title,
  content,
  imageUrl,
  activeCard,
  setActiveCard,
}) => {
  const isActive = id === activeCard;

  const handleToggle = () => {
    setActiveCard(isActive ? null : id);
  };

  const handleClick = () => {
    window.location.href = `/services#${id}`;
  }

  return (
    <div
      onClick={handleToggle}
      className="cursor-pointer bg-white rounded-2xl shadow-md p-5 transition-all duration-300 hover:shadow-xl relative"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        <motion.div
          animate={{ rotate: isActive ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </motion.div>
      </div>

      {/* Description */}
      <p className="text-gray-600 mt-2">{content}</p>

      {/* CTA Button (Visible only when image is hidden) */}
      {!isActive && (
        <Link href={`/services#${id}`} scroll={false}>
        <button
          className="mt-4 inline-block bg-black text-amber-300 px-4 py-2 rounded-lg text-sm hover:bg-amber-300 hover:text-black hover:transition-linear"
          onClick={(e) => {
            e.stopPropagation(); // Prevent card toggle on button click
            // alert(`CTA clicked for ${title}`);
            handleClick();
          }}
        >
          Learn More
        </button>
        </Link>
      )}

      {/* Image - Only visible when card is active */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden mt-4"
          >
            <img
              src={imageUrl}
              alt={title}
              className="rounded-lg w-full h-auto"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Card;

