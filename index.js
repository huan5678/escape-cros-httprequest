console.clear()

moment.locale('zh-tw')

const crosUrl = 'https://esc-cros-anywhere.herokuapp.com'

const baseUrl = 'https://hex-escape-room.herokuapp.com'
const apiPath = '/api/cors/news'

const list = document.querySelector('.list')

const page = document.querySelector('.col-12')

let isOpen = false

let result = ''

const render = function(data){
  (isOpen) ? page.classList.remove("hidden") : page.classList.add('hidden');
  
  const template = `
  <div class="col">
              <div class="card bg-dark text-white card-gradient" ><img src="${data?.urlToImage}" class="card-img" alt="${data?.title}">
                <div class="card-img-overlay">
                  <h5 class="card-title">${data?.title}</h5>
                  <p class="card-text">${moment(data?.publishedAt).format('YYYY-MM-DD Ahh:mm:ss')}</p><a href="#" class="stretched-link" data-id="${data?.id}"></a>
                </div>
              </div>
            </div>
  `
  result += template
  
}

const renderPage = function (data) {
  (isOpen) ? page.classList.remove("hidden") : page.classList.add('hidden');
  const template = `
  <div class="sticky-top">
        <!-- 點擊關閉側欄 -->
        <button class="btn btn-outline-secondary shadow border-0">
          <i class="bi bi-caret-left-fill"></i> 返回
        </button>
        <h2 class="mt-3">${data?.title}</h2>
        <span>${moment(data?.publishedAt).format('YYYY-MM-DD Ahh:mm:ss')}</span>
        <img src="${data?.urlImage}" class="img-fluid" alt="">
        <p>${data?.description}</p>
        <a href="${data?.url}" target="blank">看更多</a>
      </div>
  `
  page.innerHTML = template
}

const getNews = function(id = '1'){
  axios.get(`${crosUrl}/${baseUrl}${apiPath}/${id}`)
    .then(res => {
    // console.log(res.data)
    renderPage(res.data.data)
    const btn = document.querySelector('.btn')
    btn.addEventListener('click', ()=>{
    isOpen = false
    render()
  })
  })
  .catch(err => console.error(err))
}

const init = function(){
   axios.get(`${baseUrl}${apiPath}`).then(res=>{
  // console.log(res.data)
     res.data.data.forEach(item=>{
       render(item)
     })
     list.innerHTML = result
  const cards = document.querySelectorAll('.card-gradient')
  cards.forEach(card => {
    card.addEventListener('click', ()=>{
  // console.log(event.target.dataset.id)
  isOpen = true
  getNews(event.target.dataset.id)
  render()
})
  // console.log(card)
  })
})
  .catch(err => console.error(err))
}


init();