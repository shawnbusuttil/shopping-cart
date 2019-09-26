export const PRODUCT_MOCK = {
    key: 0,
    name: "Romney Lamb Rack of Ribs (Whole Breast)",
    producer: {
      name: "Park Farm"
    },
    measurement: {
      displayName: "Boned and Rolled (min. 700g)"
    },
    pricePerUnit: "£11.07/kg",
    media: [
      {
        type: "Image",
        url: "https://fd-v5-api-release.imgix.net/assets/product_images/965b6952214c7609229444a77b228603c499eac4dee9ccb3fe380ad5c6f5706e/Farmdrop_21.2.181312_Lamb_Rolled_Belly.jpg",
        position: 1
      }
    ],
    variants: [
      {
        pricePerUnit: "£10.64/kg",
        measurement: {
          displayName: "With bone (min. 700g)"
        }
      }
    ],
    saleText: null,
    price: {
      pence: 775
    },
    salePrice: null
};

export const PRODUCT_MOCK_WITH_VARIANTS = {
  ...PRODUCT_MOCK,
  variants: [
    {
      pricePerUnit: "£10.64/kg",
      measurement: {
        displayName: "With bone (min. 700g)"
      }
    },
    {
      pricePerUnit: "£11.00/kg",
      measurement: {
        displayName: "With bone and ketchup (min. 800g)"
      }
    }
  ]
};

export const PRODUCT_MOCK_WITH_DISCOUNT = {
  ...PRODUCT_MOCK,
  saleText: "10% OFF",
  salePrice: {
    pence: 1500
  }
};