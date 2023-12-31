const API_KEY = "2645ad5a7bdc435384fb6da7b7bb7456";
const proxyUrl = "https://cors-anywhere.herokuapp.com/"
const url = `${proxyUrl}https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;
const request = new Request(url);

window.addEventListener("load", () => fetchNews("India"));
function reload() {
      window.location.reload();
}
async function fetchNews(query) {
      //  const res = await fetch(url);
      //  const data = await res.json();
      // console.log(data);
      fetch(request)
            .then(response => response.json())
            .then((data) => {
                  console.log(data);
                  bindData(data.articles);

            })
            .catch(error => {
                  console.log(error);
            });
      console.log('check');
      // bindData(data.articles);
}

function bindData(article) {
      const cardsContainer = document.getElementById('cards-container');
      const newsCardTemplate = document.getElementById('template-news-card');

      cardsContainer.innerHTML = '';

      article.forEach(article => {
            if (!article.urlToImage) return;
            const cardClone = newsCardTemplate.content.cloneNode(true);
            fillDataInCard(cardClone, article);
            cardsContainer.appendChild(cardClone);
      });

}

function fillDataInCard(cardClone, article) {
      const newsImg = cardClone.querySelector('.news-img');
      const newsTitle = cardClone.querySelector('.news-title');
      const newsSource = cardClone.querySelector('.news-source');
      const newsDesc = cardClone.querySelector('.news-desc');

      // console.log(newsImg);

      newsImg.src = article.urlToImage;
      newsTitle.innerHTML = article.title;
      newsDesc.innerHTML = article.description;

      const date = new Date(article.publishedAt).toLocaleString("en-US", { timeZone: "Asia/Jakarta" });

      newsSource.innerHTML = `${article.source.name}.${date}`;

      cardClone.firstElementChild.addEventListener("click", () => { window.open(article.url, "_blank") });

}
let curSelectedNav = null;
function onNavItemClick(id) {
      fetchNews(id);
      const navItem = document.getElementById(id);
      curSelectedNav?.classList.remove('active');
      curSelectedNav = navItem;
      curSelectedNav.classList.add('active');

}
const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener('click', () => {
      const query = searchText.value;
      if (!query) return;
      fetchNews(query);
      curSelectedNav?.classList.remove('active');
      curSelectedNav = null;
})
