class FeaturesController < ApplicationController
		 respond_to :json
	def create
	
		@feature = Feature.new(feature_params)
		if @feature.save
			render json: @feature
		else
			render json: @feature.errors.full_messages
		end
	end
	def update
		@feature = Feature.find(params[:feature][:id])
		if @feature.update_attributes(feature_params)
			render json: @feature
		else
			#todo
		end
	end
	def index
		@element = Element.find(params[:id])
		render json: @element.features
	end
	def delete
		
		@feature = Feature.find(params[:id])
		@readable = { id: @feature.id, attribute: "features", resource:'elements'}
		if @feature.destroy
			render json: @readable
		else
			render json: @feature
		end
	end
	private
	def feature_params
			params.require(:feature).permit(:content, 
				:element_id, :id)
		end
end
