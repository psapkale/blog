import { useEffect, useState } from "react";

export const FeaturedBlogs = () => {
   const [blogs, setBlogs] = useState([]);
   const shuffledIndex = shuffleNumbers();
   const colors = [
      "#b4c8e1",
      "#ffafa5",
      "#c8aff0",
      "#fad24b",
      "#14c8eb",
      "#ff8c19",
   ];

   async function fetchData() {
      try {
         const data = await fetch("http://localhost:3000/api/featured");
         const res = await data.json();

         setBlogs(res?.featuredBlogs);
      } catch (err) {
         console.log(err);
      }
   }

   function monthString(month) {
      switch (month) {
         case "01":
            return "Jan";
         case "02":
            return "Feb";
         case "03":
            return "Mar";
         case "04":
            return "Apr";
         case "05":
            return "May";
         case "06":
            return "Jun";
         case "07":
            return "Jul";
         case "08":
            return "Aug";
         case "09":
            return "Sep";
         case "10":
            return "Oct";
         case "11":
            return "Nov";
         case "12":
            return "Dec";
      }
   }

   function shuffleNumbers() {
      const nums = [];
      const availableNumbers = [1, 2, 3, 4, 5, 6];

      for (let i = 0; i < 6; i++) {
         const randomIndex = Math.floor(
            Math.random() * availableNumbers.length
         );
         nums.push(availableNumbers[randomIndex]);
         availableNumbers.splice(randomIndex, 1);
      }

      return nums;
   }

   useEffect(() => {
      fetchData();
   }, []);

   return (
      <div className="w-[66%] mx-auto my-20 h-fit px-10">
         <h1 className="text-[12px] font-[600]">Featured</h1>
         <div className="mt-10 flex gap-10 items-start justify-evenly">
            {blogs?.map((blog, i) => {
               const s = blog.createdAt;
               const month = monthString(s.slice(5, 7));
               const date = s.slice(8, 10);
               const year = s.slice(0, 4);
               const createdAt = month + " " + date + ", " + year;
               const index = shuffledIndex[i];

               return (
                  <div
                     key={blog.id}
                     className="w-[33%] h-fit flex flex-col items-start cursor-pointer"
                  >
                     <img
                        src={`/img${index}.jpg`}
                        alt={index}
                        style={{
                           backgroundColor: colors[index],
                        }}
                        className={`w-[96%] h-[196px] object-cover`}
                     />
                     <div className="-translate-y-10 -translate-x-4">
                        <h1 className="bg-black text-white px-2 py-1 hover:underline">
                           {blog.title}
                        </h1>
                        <div className="mt-1 text-[11px] flex gap-2 items-center justify-start text-nowrap flex-wrap">
                           <b className="text-[12px]">/ /</b>
                           <h1 className="">{createdAt}</h1>
                           <>•</>
                           <h1 className="underline hover:no-underline">
                              {blog.categories[0].category.name}
                           </h1>
                        </div>
                     </div>
                  </div>
               );
            })}
         </div>
      </div>
   );
};
