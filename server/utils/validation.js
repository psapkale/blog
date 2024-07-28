const { CategoryName } = require("./categories");

const validateCategories = (categories) => {
   const invalidCategories = categories.filter(
      (category) => !Object.values(CategoryName).includes(category)
   );

   return invalidCategories.length == 0;
};

module.exports = { validateCategories };
