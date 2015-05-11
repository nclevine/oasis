Rails.application.routes.draw do
  root 'home#home'
  devise_for :users
  resources :users
  resources :spaces
  resources :artworks
  resources :journals
  resources :entries
end
