import { CombinedFoodItem, FoodItem } from "@/types/types";

export  const foodItems: FoodItem[] = [
    // Breakfast items
    {
      name: "Egg",
      category: "breakfast",
      protein: 6,
      calories: 78,
      carbs: 1,
      fats: 5,
      servingSize: "1 large egg"
    },
    {
      name: "Milk",
      category: "breakfast",
      protein: 8,
      calories: 149,
      carbs: 12,
      fats: 8,
      servingSize: "1 cup"
    },
    {
      name: "Oats",
      category: "breakfast",
      protein: 5,
      calories: 154,
      carbs: 27,
      fats: 3,
      servingSize: "1 cup cooked"
    },
    {
      name: "Whole Wheat Toast",
      category: "breakfast",
      protein: 4,
      calories: 70,
      carbs: 12,
      fats: 1,
      servingSize: "1 slice"
    },
    {
      name: "Greek Yogurt",
      category: "breakfast",
      protein: 10,
      calories: 100,
      carbs: 6,
      fats: 0,
      servingSize: "1 container (6 oz)"
    },
    {
      name: "Banana",
      category: "breakfast",
      protein: 1.3,
      calories: 105,
      carbs: 27,
      fats: 0.3,
      servingSize: "1 medium"
    },
    {
      name: "Orange Juice",
      category: "breakfast",
      protein: 2,
      calories: 112,
      carbs: 26,
      fats: 0.5,
      servingSize: "1 cup"
    },
    {
      name: "Avocado Toast",
      category: "breakfast",
      protein: 5,
      calories: 200,
      carbs: 24,
      fats: 9,
      servingSize: "1 slice"
    },
    {
      name: "Pancakes",
      category: "breakfast",
      protein: 4,
      calories: 86,
      carbs: 15,
      fats: 2,
      servingSize: "1 pancake"
    },
    {
      name: "Smoothie",
      category: "breakfast",
      protein: 2,
      calories: 130,
      carbs: 30,
      fats: 1,
      servingSize: "1 cup"
    },
  
    // Lunch items
    {
      name: "Chicken Breast",
      category: "lunch",
      protein: 31,
      calories: 165,
      carbs: 0,
      fats: 3.6,
      servingSize: "100g"
    },
    {
      name: "Broccoli",
      category: "lunch",
      protein: 3,
      calories: 55,
      carbs: 11,
      fats: 0.6,
      servingSize: "1 cup cooked"
    },
    {
      name: "Brown Rice",
      category: "lunch",
      protein: 5,
      calories: 216,
      carbs: 45,
      fats: 1.8,
      servingSize: "1 cup cooked"
    },
    {
      name: "Quinoa",
      category: "lunch",
      protein: 8,
      calories: 222,
      carbs: 39,
      fats: 3.5,
      servingSize: "1 cup cooked"
    },
    {
      name: "Turkey Breast",
      category: "lunch",
      protein: 24,
      calories: 125,
      carbs: 0,
      fats: 1,
      servingSize: "3 ounces"
    },
    {
      name: "Spinach",
      category: "lunch",
      protein: 2.9,
      calories: 23,
      carbs: 3.6,
      fats: 0.4,
      servingSize: "100g"
    },
    {
      name: "Hummus",
      category: "lunch",
      protein: 2,
      calories: 70,
      carbs: 8,
      fats: 3,
      servingSize: "2 tablespoons"
    },
    {
      name: "Lentil Soup",
      category: "lunch",
      protein: 18,
      calories: 230,
      carbs: 40,
      fats: 0.8,
      servingSize: "1 cup"
    },
    {
      name: "Grilled Cheese Sandwich",
      category: "lunch",
      protein: 12,
      calories: 300,
      carbs: 30,
      fats: 15,
      servingSize: "1 sandwich"
    },
    {
      name: "Caesar Salad",
      category: "lunch",
      protein: 7,
      calories: 170,
      carbs: 10,
      fats: 10,
      servingSize: "1 cup"
    },
  
    // Snack items
    {
      name: "Almonds",
      category: "snack",
      protein: 6,
      calories: 164,
      carbs: 6,
      fats: 14,
      servingSize: "1 ounce"
    },
    {
      name: "Apple",
      category: "snack",
      protein: 0.3,
      calories: 95,
      carbs: 25,
      fats: 0.3,
      servingSize: "1 medium"
    },
    {
      name: "Carrots",
      category: "snack",
      protein: 0.9,
      calories: 25,
      carbs: 6,
      fats: 0.1,
      servingSize: "1 medium"
    },
    {
      name: "Cottage Cheese",
      category: "snack",
      protein: 14,
      calories: 98,
      carbs: 3.4,
      fats: 4.3,
      servingSize: "1/2 cup"
    },
    {
      name: "Granola Bar",
      category: "snack",
      protein: 3,
      calories: 100,
      carbs: 18,
      fats: 3,
      servingSize: "1 bar"
    },
    {
      name: "Peanut Butter",
      category: "snack",
      protein: 8,
      calories: 188,
      carbs: 6,
      fats: 16,
      servingSize: "2 tablespoons"
    },
    {
      name: "Trail Mix",
      category: "snack",
      protein: 6,
      calories: 180,
      carbs: 15,
      fats: 12,
      servingSize: "1/4 cup"
    },
    {
      name: "Yogurt",
      category: "snack",
      protein: 5,
      calories: 100,
      carbs: 20,
      fats: 2,
      servingSize: "1 cup"
    },
    {
      name: "Rice Cakes",
      category: "snack",
      protein: 1,
      calories: 35,
      carbs: 7,
      fats: 0.3,
      servingSize: "1 cake"
    },
    {
      name: "Fruit Salad",
      category: "snack",
      protein: 1,
      calories: 50,
      carbs: 12,
      fats: 0.2,
      servingSize: "1 cup"
    },
  
    // Dinner items
    {
      name: "Salmon",
      category: "dinner",
      protein: 22,
      calories: 206,
      carbs: 0,
      fats: 13,
      servingSize: "3 ounces"
    },
    {
      name: "Sweet Potato",
      category: "dinner",
      protein: 2,
      calories: 112,
      carbs: 26,
      fats: 0.1,
      servingSize: "1 medium"
    },
    {
      name: "Tofu",
      category: "dinner",
      protein: 10,
      calories: 94,
      carbs: 2.3,
      fats: 5,
      servingSize: "1/2 cup"
    },
    {
      name: "Beef Steak",
      category: "dinner",
      protein: 25,
      calories: 271,
      carbs: 0,
      fats: 19,
      servingSize: "3 ounces"
    },
    {
      name: "Brussels Sprouts",
      category: "dinner",
      protein: 3,
      calories: 38,
      carbs: 8,
      fats: 0.3,
      servingSize: "1 cup cooked"
    },
    {
      name: "Pasta",
      category: "dinner",
      protein: 8,
      calories: 220,
      carbs: 43,
      fats: 1.3,
      servingSize: "1 cup cooked"
    },
    {
      name: "Chicken Thigh",
      category: "dinner",
      protein: 19,
      calories: 209,
      carbs: 0,
      fats: 11,
      servingSize: "3 ounces"
    },
    {
      name: "Mixed Vegetables",
      category: "dinner",
      protein: 2,
      calories: 75,
      carbs: 15,
      fats: 1,
      servingSize: "1 cup cooked"
    },
    {
      name: "Baked Potato",
      category: "dinner",
      protein: 4,
      calories: 161,
      carbs: 37,
      fats: 0.2,
      servingSize: "1 medium"
    },
    {
      name: "Cauliflower",
      category: "dinner",
      protein: 2,
      calories: 25,
      carbs: 5,
      fats: 0.1,
      servingSize: "1 cup cooked"
    },
  
    // Beverage items
    {
      name: "Water",
      category: "beverage",
      protein: 0,
      calories: 0,
      carbs: 0,
      fats: 0,
      servingSize: "1 cup"
    },
    {
      name: "Coffee",
      category: "beverage",
      protein: 0.3,
      calories: 2,
      carbs: 0,
      fats: 0,
      servingSize: "1 cup"
    },
    {
      name: "Green Tea",
      category: "beverage",
      protein: 0,
      calories: 0,
      carbs: 0,
      fats: 0,
      servingSize: "1 cup"
    },
    {
      name: "Orange Juice",
      category: "beverage",
      protein: 2,
      calories: 112,
      carbs: 26,
      fats: 0.5,
      servingSize: "1 cup"
    },
    {
      name: "Smoothie",
      category: "beverage",
      protein: 2,
      calories: 130,
      carbs: 30,
      fats: 1,
      servingSize: "1 cup"
    },
    {
      name: "Soda",
      category: "beverage",
      protein: 0,
      calories: 150,
      carbs: 39,
      fats: 0,
      servingSize: "1 can"
    },
    {
      name: "Milkshake",
      category: "beverage",
      protein: 8,
      calories: 300,
      carbs: 45,
      fats: 10,
      servingSize: "1 cup"
    },
    {
      name: "Lemonade",
      category: "beverage",
      protein: 0,
      calories: 100,
      carbs: 25,
      fats: 0,
      servingSize: "1 cup"
    },
    {
      name: "Iced Tea",
      category: "beverage",
      protein: 0,
      calories: 90,
      carbs: 23,
      fats: 0,
      servingSize: "1 cup"
    },
    {
      name: "Hot Chocolate",
      category: "beverage",
      protein: 2,
      calories: 200,
      carbs: 38,
      fats: 5,
      servingSize: "1 cup"
    }
  ];

  export 
  const combinedFoodItems: CombinedFoodItem[] = [
    // Breakfast
    {
      name: "Classic Breakfast",
      category: "breakfast",
      totalProtein: 12,
      totalCalories: 260,
      totalCarbs: 39,
      totalFats: 6.5,
      servingSize: "1 large egg, 1 slice toast, 1 cup juice"
    },
    {
      name: "Healthy Oatmeal",
      category: "breakfast",
      totalProtein: 16.3,
      totalCalories: 359,
      totalCarbs: 60,
      totalFats: 3.3,
      servingSize: "1 cup cooked oats, 1 container yogurt, 1 medium banana"
    },
    {
      name: "Smoothie Bowl",
      category: "breakfast",
      totalProtein: 12,
      totalCalories: 300,
      totalCarbs: 45,
      totalFats: 8,
      servingSize: "1 cup smoothie, 1/2 cup granola, 1/2 cup berries"
    },
    {
      name: "Avocado Toast",
      category: "breakfast",
      totalProtein: 14,
      totalCalories: 350,
      totalCarbs: 42,
      totalFats: 18,
      servingSize: "2 slices whole grain bread, 1 avocado, 1 egg"
    },
    // Lunch
    {
      name: "Lunch Power Bowl",
      category: "lunch",
      totalProtein: 42,
      totalCalories: 442,
      totalCarbs: 50,
      totalFats: 7.7,
      servingSize: "100g chicken, 1 cup cooked quinoa, 1 cup cooked broccoli"
    },
    {
      name: "Vegan Lunch Plate",
      category: "lunch",
      totalProtein: 18,
      totalCalories: 230,
      totalCarbs: 40,
      totalFats: 3.5,
      servingSize: "1 serving of lentil soup"
    },
    {
      name: "Turkey Sandwich",
      category: "lunch",
      totalProtein: 30,
      totalCalories: 400,
      totalCarbs: 50,
      totalFats: 12,
      servingSize: "2 slices whole grain bread, 3 oz turkey, veggies"
    },
    {
      name: "Salmon Salad",
      category: "lunch",
      totalProtein: 35,
      totalCalories: 420,
      totalCarbs: 15,
      totalFats: 25,
      servingSize: "100g salmon, 2 cups mixed greens, 1 tbsp dressing"
    },
    // Snacks
    {
      name: "Afternoon Snack",
      category: "snack",
      totalProtein: 7,
      totalCalories: 95,
      totalCarbs: 22,
      totalFats: 1,
      servingSize: "1 medium apple, 2 tbsp peanut butter"
    },
    {
      name: "Yogurt Parfait",
      category: "snack",
      totalProtein: 12,
      totalCalories: 150,
      totalCarbs: 20,
      totalFats: 4,
      servingSize: "1 cup Greek yogurt, 1/2 cup granola, 1/2 cup berries"
    },
    {
      name: "Nut Mix",
      category: "snack",
      totalProtein: 6,
      totalCalories: 200,
      totalCarbs: 15,
      totalFats: 16,
      servingSize: "1/4 cup mixed nuts"
    },
    {
      name: "Veggie Sticks & Hummus",
      category: "snack",
      totalProtein: 5,
      totalCalories: 150,
      totalCarbs: 20,
      totalFats: 8,
      servingSize: "1 cup mixed veggie sticks, 1/4 cup hummus"
    },
    // Dinner
    {
      name: "Dinner Delight",
      category: "dinner",
      totalProtein: 35,
      totalCalories: 450,
      totalCarbs: 50,
      totalFats: 12,
      servingSize: "100g grilled salmon, 1 cup cooked brown rice, 1 cup salad"
    },
    {
      name: "Steak & Veggies",
      category: "dinner",
      totalProtein: 40,
      totalCalories: 500,
      totalCarbs: 30,
      totalFats: 20,
      servingSize: "150g steak, 1 cup mixed veggies, 1 medium potato"
    },
    {
      name: "Chicken Stir-Fry",
      category: "dinner",
      totalProtein: 35,
      totalCalories: 400,
      totalCarbs: 45,
      totalFats: 10,
      servingSize: "100g chicken, 2 cups mixed veggies, 1 cup rice"
    },
    {
      name: "Pasta Primavera",
      category: "dinner",
      totalProtein: 15,
      totalCalories: 380,
      totalCarbs: 60,
      totalFats: 10,
      servingSize: "2 cups pasta, 1 cup mixed veggies, 1 tbsp olive oil"
    },
    // Beverages
    {
      name: "Evening Beverage",
      category: "beverage",
      totalProtein: 9,
      totalCalories: 150,
      totalCarbs: 27,
      totalFats: 3,
      servingSize: "1 cup milk, 1 medium banana"
    },
    {
      name: "Green Smoothie",
      category: "beverage",
      totalProtein: 5,
      totalCalories: 200,
      totalCarbs: 45,
      totalFats: 2,
      servingSize: "1 cup spinach, 1 banana, 1/2 cup yogurt, 1 cup water"
    },
    {
      name: "Protein Shake",
      category: "beverage",
      totalProtein: 20,
      totalCalories: 250,
      totalCarbs: 30,
      totalFats: 5,
      servingSize: "1 scoop protein powder, 1 cup milk, 1 cup berries"
    },
    {
      name: "Fruit Juice",
      category: "beverage",
      totalProtein: 2,
      totalCalories: 120,
      totalCarbs: 30,
      totalFats: 0,
      servingSize: "1 cup mixed fruit juice"
    }
  ];