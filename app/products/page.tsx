import ProductList from "@/components/products/ProductList";

export default function ProductsPage() {
  // 실제 구현에서는 서버 컴포넌트에서 데이터를 가져오거나 API 호출로 대체할 수 있습니다
  const sampleProducts = [
    {
      id: "1",
      imageUrl: "https://via.placeholder.com/300",
      title: "한번에 배우는 필 배우는 재욱 재욱은 최대 두줄",
      brand: "김로블",
      price: 12000,
      rating: 4.5,
    },
    {
      id: "2",
      imageUrl: "https://via.placeholder.com/300?text=Pet+Items",
      title: "반려동물용 고급 장난감 세트 - 강아지와 고양이 모두 사용 가능",
      brand: "펫케어",
      price: 24900,
      rating: 4.8,
    },
    {
      id: "3",
      imageUrl: "https://via.placeholder.com/300?text=Stickers",
      title: "귀여운 동물 스티커 팩 - 수첩 및 다이어리 꾸미기용",
      brand: "스티커랜드",
      price: 8500,
      rating: 4.3,
    },
    {
      id: "4",
      imageUrl: "https://via.placeholder.com/300?text=Mug",
      title: "북극곰 디자인 도자기 머그컵 - 보냉 보온 겸용",
      brand: "홈리빙",
      price: 15800,
      rating: 4.2,
    },
    {
      id: "5",
      imageUrl: "https://via.placeholder.com/300?text=Cushion",
      title: "구름 모양 베개 쿠션 - 거실 침실 인테리어 소품",
      brand: "코지홈",
      price: 19000,
      rating: 4.7,
    },
    {
      id: "6",
      imageUrl: "https://via.placeholder.com/300?text=Calendar",
      title: "2024 탁상용 동물 캘린더 - 매달 다른 동물 일러스트",
      brand: "문구나라",
      price: 9800,
      rating: 4.4,
    },
  ];

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold">
        장터에 필요한 자료를 받아보세요
      </h1>
      <ProductList
        title="장터에 필요한 자료를 받아보세요"
        products={sampleProducts}
        viewAllHref="/products/category/all"
      />
    </main>
  );
}
