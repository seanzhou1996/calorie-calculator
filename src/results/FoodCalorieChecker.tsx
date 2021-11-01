import React, { useEffect, useState } from 'react';
import { parse } from 'papaparse';

// type FoodUnit = 'g' | 'ml';

enum FoodType {
  Grains = 1,
  MeatFishEgg = 2,
  Vegetables = 3,
  Fruits = 4,
  ReadyToEat = 5,
  Bread = 6,
  DimSum = 7,
  Snacks = 8,
  OtherReadyToEat = 9,
  Drinks = 10,
  FatsAndOils = 11,
  Others = 12,
  SoutheastAsian = 13,
}

const foodTypeLabels: Record<FoodType, string> = {
  [FoodType.Grains]: 'Grains',
  [FoodType.MeatFishEgg]: 'Meat, fish, egg and alternatives',
  [FoodType.Vegetables]: 'Vegetables',
  [FoodType.Fruits]: 'Fruits',
  [FoodType.ReadyToEat]: 'Ready-to-eat noodles, pasta and rice dishes',
  [FoodType.Bread]: 'Bread, cakes and pastries',
  [FoodType.DimSum]: 'Chinese Dim Sum',
  [FoodType.Snacks]: 'Snacks',
  [FoodType.OtherReadyToEat]: 'Other ready-to-eat food',
  [FoodType.Drinks]: 'Drinks',
  [FoodType.FatsAndOils]: 'Fats and oils',
  [FoodType.Others]: 'Others',
  [FoodType.SoutheastAsian]: 'Southeast Asian dishes',
};

interface Food {
  type: number;
  name: string;
  portion: string;
  amount: number;
  calorie: number;
  isDrink?: boolean;
}

const url = `${process.env.PUBLIC_URL}/food__calorie-table.csv`;

function FoodCalorieChecker() {
  const [foodArray, setFoodArray] = useState<Food[]>([]);

  useEffect(() => {
    parse<Food>(url, {
      delimiter: ',',
      download: true,
      header: true,
      dynamicTyping: true,
      transformHeader: (header) => header.trim(),
      transform: (value) => value.trim(),
      complete: ({ data }) => {
        console.log(data);
        setFoodArray(data);
      },
    });
  }, []);

  return <div>{JSON.stringify(foodArray)}</div>;
}

export default FoodCalorieChecker;
