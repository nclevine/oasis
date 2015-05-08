Rails.application.routes.draw do
  devise_for :users
  root 'home#home'
  resources :spaces
  resources :artworks
  resources :journals
  resources :entries
end
