Rails.application.routes.draw do
  # get 'password_resets/new'
  post '/auth/login', to: 'authentication#login'
  get '/auth/verify', to: 'authentication#verify'
  
  resources :users
  resources :password_resets


  resources :vehicles do
    resources :flashcards
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
