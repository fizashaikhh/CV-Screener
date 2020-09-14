//CV iterator
let xhr = new XMLHttpRequest();
xhr.open('GET','data.json',false)
var data;
xhr.onload = ()=>{
  
   data = JSON.parse(xhr.responseText)
}
xhr.send();

function cvIterator(array) {
  let nextIndex=0;
  return{
    next :function () {
      return (nextIndex<array.length)?{value:array[nextIndex++],done:false}:{ done: true};
      
    }
  }
}


const next = document.getElementById('next')
next.addEventListener('click', nextCV)
var candidates = cvIterator(data)


nextCV();

function nextCV() {
  let image = document.getElementById('image')
  let profile = document.getElementById('profile')
  const currentCandidate = candidates.next().value
  if(currentCandidate!= undefined){
    console.log(currentCandidate);
  
  image.innerHTML = `<img src='${currentCandidate.picture}'>`
  profile.innerHTML = `<ul class="list-group list-group-flush">
  <li class="list-group-item">Name : ${currentCandidate.name.title}. ${currentCandidate.name.first} ${currentCandidate.name.last}</li>
  <li class="list-group-item">Gender : ${currentCandidate.gender}</li>
  <li class="list-group-item">Language : ${currentCandidate.language}</li>
  <li class="list-group-item">Uses : ${currentCandidate.framework} framework</li>
</ul>`
  }
  else{
    image.innerHTML = ``;
    profile.className = "alert alert-warning alert-dismissible fade show"
    profile.innerHTML = `<strong>Thats all we got!</strong> 
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>`
  let next = document.getElementById('next')
  next.remove()
    
  }
}
