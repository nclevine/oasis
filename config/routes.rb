Rails.application.routes.draw do
  root 'home#home'
  devise_for :users
  resources :users
  resources :spaces
  resources :artworks
  resources :journals
  resources :entries
  get '/bkmuseum', to: 'bkmuseum#search'
  get '/bkmuseum/lookup', to: 'bkmuseum#lookup'
  get '/coop', to: 'coop#search'
  get '/coop/lookup', to: 'coop#lookup'
  get '/metmuseum', to: 'metmuseum#search'
  get '/metmuseum/lookup', to: 'metmuseum#lookup'
  get '/rijksmuseum', to: 'rijksmuseum#search'
  get '/rijksmuseum/lookup', to: 'rijksmuseum#lookup'
  get '/tumblr', to: 'tumblr#search'
  get '/tumblr/lookup', to: 'tumblr#lookup'
  get '/victoriaalbert', to: 'victoriaalbert#search'
  get '/victoriaalbert/lookup', to: 'victoriaalbert#lookup'
end
