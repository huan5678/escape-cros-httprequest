console.clear()

moment.locale('zh-tw')

const baseUrl = 'https://hex-escape-room.herokuapp.com'
const apiPath = '/api/cors/news'

const list = document.querySelector('.list')

const btn = document.querySelector('.btn')

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
                  <p class="card-text">${moment(data?.publishedAt).format('YYYY-MM-DD HH:mm:ss')}</p><a href="#" class="stretched-link" data-id="${data?.id}"></a>
                </div>
              </div>
            </div>
  `
  result += template
  
}

const getAllNews = function(){
   axios.get(`${baseUrl}${apiPath}`).then(res=>{
  console.log(res.data)
     res.data.data.forEach(item=>{
       render(item)
     })
     list.innerHTML = result
     const cards = document.querySelectorAll('.card-gradient')
  cards.forEach(card => {
    card.addEventListener('click', ()=>{
  console.log(event.target.dataset.id)
  isOpen = true
  getNews(event.target.dataset.id)
  render()
})
  console.log(card)
  })
})
  .catch(err => console.error(err))
}

const getNews = function(id = '1'){
  axios.get(`${baseUrl}${apiPath}/:${id}`).then(res=>{
    console.log(res.data)
    return res.data.data
  })
  .catch(err => console.error(err))
}

const init = function(){
  btn.addEventListener('click', ()=>{
  isOpen = false
  render()
})

 getAllNews();
// getNews(1)
  
  
                       }

init()