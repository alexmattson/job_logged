Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create]
    resource :session, only: [:create, :destroy]
    resources :applications, only: [:create, :destroy, :update, :index, :show] do
      resources :events, only: [:create, :update, :destroy, :index]
    end
    get '/events', to: 'events#filtered'
  end
end
