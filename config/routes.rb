Rails.application.routes.draw do
  devise_for :users
  root 'space#index'
  resources :spaces
  resources :artworks
  resources :journals
  resources :entries
end
