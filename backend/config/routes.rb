Rails.application.routes.draw do
  # Defines the root path route ("/")
  # root "articles#index"
  resources :shared
  post 'login', to: 'authentication#login'
  post 'signup', to: 'authentication#signup'
  get 'me', to: 'user#me'

end
