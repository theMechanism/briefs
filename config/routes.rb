AngularBrief::Application.routes.draw do

root to: "home#index"
resources :briefs, except: [:new, :edit]
resources :questions, except: [:new, :edit]
resources :elements, except: [:new, :edit]
resources :features, except: [:new, :edit]
scope :api do
    get "/briefs(.:format)" => "briefs#index"
    get "/briefs/:id(.:format)" => "briefs#show"
    get "/briefs/:id/elements(.:format)" => "elements#index"
    post "/briefs(.:format)" => "briefs#create" 

    post "/elements(.:format)" =>"elements#create"
    post "/audience(.:format)" =>"audiences#create"
    post "/sites(.:format)" =>"sites#create"
    post "/elements/:id/features(.:format)" =>"features#create"
    post "/features/:id(.:format)" => "features#update" 
    post "/briefs/:id(.:format)" => "briefs#update" 
    post "/elements/:id(.:format)" => "elements#update" 
    post "/audience/:id(.:format)" => "audiences#update" 
    post "/sites/:id(.:format)" => "sites#update" 
    post "/briefs/:id/comments(.:format)" => "comments#create" 

    delete "/feature/:id" => "features#delete"
    delete "/element/:id" => "elements#delete"
    delete "/site/:id" => "sites#delete"
    delete "/audience/:id" => "audiences#delete"
    delete "/brief/:id" => "briefs#delete"
end
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
