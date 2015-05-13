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
end
