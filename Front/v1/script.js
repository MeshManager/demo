document.addEventListener('DOMContentLoaded', () => {
    const itemGrid = document.getElementById('item-grid');
    const sampleItems = [
        { image: 'https://gogetyourgreen-images.s3.ap-northeast-2.amazonaws.com/car.jpg', title: '배터리 나간 자동차', price: '10,000,000원', location: '가산동 ∙ 끌올 2시간 전' },
        { image: 'https://gogetyourgreen-images.s3.ap-northeast-2.amazonaws.com/carrot.jpg', title: '신선한 당근', price: '35,000원', location: '가산동 ∙ 2시간 전' },
        { image: 'https://gogetyourgreen-images.s3.ap-northeast-2.amazonaws.com/glasses.jpg', title: '안경', price: '100,000원', location: '가산동 ∙ 2시간 전' },
        { image: 'https://gogetyourgreen-images.s3.ap-northeast-2.amazonaws.com/golf.jpg', title: '로스트볼', price: '13,000원', location: '가산동 ∙ 2시간 전' },
        { image: 'https://gogetyourgreen-images.s3.ap-northeast-2.amazonaws.com/laptop.jpg', title: 'mac book pro', price: '1,120,000원', location: '독산동 ∙ 1시간 전' },
        { image: 'https://gogetyourgreen-images.s3.ap-northeast-2.amazonaws.com/pants.jpg', title: '물빠짐 있는 청바지', price: '5,000원', location: '시흥동 ∙ 3시간 전' },
        { image: 'https://gogetyourgreen-images.s3.ap-northeast-2.amazonaws.com/shoes.jpg', title: '방수 운동화', price: '75,000원', location: '가산동 ∙ 5시간 전' },
        { image: 'https://gogetyourgreen-images.s3.ap-northeast-2.amazonaws.com/tv.jpg', title: '골동품 테레비', price: '420,000원', location: '독산동 ∙ 1일 전' }
    ];
    function renderItems() {
        itemGrid.innerHTML = '';
        sampleItems.forEach(item => {
            const card = document.createElement('div');
            card.className = 'item-card';
            card.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <div class="item-info">
          <h4>${item.title}</h4>
          <div class="price">${item.price}</div>
          <div class="location">${item.location}</div>
        </div>
      `;
            itemGrid.appendChild(card);
        });
    }
    renderItems();
});
