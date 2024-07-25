export interface IDiscountValue {
  id: number;
  percentage: number;
}

export interface IDiscount {
  id: number;
  name: string;
  mediaFile: string;
  discountValues: IDiscountValue[];
}

export interface ICreateDiscount {
  name: string;
  mediaFile: File;
  values: { value: number }[];
}
