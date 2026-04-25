import React, { useState, useEffect } from "react";

export const TypingWords = () => {
   const words = [
      { text: "Application", color: "#b4c8e1" },
      { text: "FrontEnd", color: "#ffafa5" },
      { text: "Infrastructure", color: "#c8aff0" },
      { text: "Machine Learning", color: "#fad24b" },
      { text: "Mobile", color: "#14c8eb" },
      { text: "Security", color: "#ff8c19" },
      { text: "Culture", color: "#fad24b" },
   ];

   const [currentWordIndex, setCurrentWordIndex] = useState(0);
   const [currentText, setCurrentText] = useState({ text: "", color: "" });
   const [isDeleting, setIsDeleting] = useState(false);
   const [typingSpeed, setTypingSpeed] = useState(150); // Default typing speed

   useEffect(() => {
      const word = words[currentWordIndex];

      // Adjust typing speed based on typing or deleting
      const speed = isDeleting ? 50 : typingSpeed;

      const handleTyping = setTimeout(() => {
         if (!isDeleting) {
            // Typing the word
            setCurrentText({
               text: word.text.substring(0, currentText.text.length + 1),
               color: word.color,
            });

            if (currentText.text === word.text) {
               // Pause at full word before starting deletion
               setTimeout(() => setIsDeleting(true), 1000);
            }
         } else {
            // Deleting the word
            setCurrentText({
               text: word.text.substring(0, currentText.text.length - 1),
               color: word.color,
            });

            if (currentText.text === "") {
               // Move to the next word after deleting
               setIsDeleting(false);
               setCurrentWordIndex((prev) => (prev + 1) % words.length); // Loop back to first word
            }
         }
      }, speed);

      return () => clearTimeout(handleTyping);
   }, [currentText, isDeleting, currentWordIndex, words, typingSpeed]);

   return (
      <span>
         <span style={{ color: currentText.color }} className="font-bold">
            {currentText.text}
         </span>
         <span className="text-blue-500 w-1 animate-blink">|</span>
      </span>
   );
};
