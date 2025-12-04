interface Review {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  content: string;
  product: string;
}

export const REVIEWS: Review[] = [
  {
    id: 1,
    name: "Ramshidha",
    avatar: "/reviews/ramshidha.jpeg",
    rating: 5,
    content:
      "I recently bought fudsy tamarind powder, and iam really impressed with this tamarind powder😍 It tastes just like fresh tamarind and mixes easily. I used it in sambar, rasam, and chutney. perfect flavor every time and highly recommended❤️",
    product: "Tamarind Powder",
  },
  {
    id: 2,
    name: "Suhailath",
    avatar: "/reviews/user.jpg",
    rating: 5,
    content:
      "I used the tamarind powder and I’m really impressed. The quality is excellent and the flavour is strong. It truly helped me to cook faster, especially dishes like sambar.",
    product: "Tamarind Powder",
  },
  {
    id: 3,
    name: "Shefna sheri",
    avatar: "/reviews/user.jpg",
    rating: 5,
    content:
      "Tamarind powder njan use cheythirunu. Really nice product. Ee product Jholi thirakullavark easy ayi dialy food undakan sahayikum. Really enjoyed the pure flavor and convenience. Idhu poleyulla mattu productugalum futureloot predheekshikunu.",
    product: "Tamarind Powder",
  },
  {
    id: 4,
    name: "Fathima Shahala",
    avatar: "/reviews/user.jpg",
    rating: 4,
    content:
      "Fudsy de Puli podi njn use chaithu. nalla product aan curryk upayokichalum oru nalla oru taste kittunnun.  pinne korch mathre powder use aakumbo thanne athiyavshiyam curryk  pakamaya pulip kittnund ,salt okke idnne pole anget pakathin itt kodtha madhi ,pinne puli eduth vellathil itt vechulla aaa process onnum cheyenda budhimut illa . Curryk mathralla puli vech use aakan pattne oru vidham sadhanoke ee powder upayokikan eluppamavunnu. enik valare usefull aaya oru product aayit thonni.",
    product: "Tamarind Powder",
  },
];
