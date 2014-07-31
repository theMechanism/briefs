class ElementsController < ApplicationController
		 respond_to :json
	def create
		
		@elem = Element.new(elem_params)
		if @elem.save
			render json: @elem
		else
			render json: @brief.errors.full_messages
		end
	end
	def delete
		@element = Element.find(params[:id])
		@readable = { id: @element.id, attribute: "elements"}
		if @element.destroy
			render json: @readable
		else
			render json: @element
		end
	end
	def index
		@brief = Brief.find(params[:id])
		@elements = @brief.elements.to_json(:include => [:features])
		render json: @elements
	end
	def update
		@element = Element.find(params[:element][:id])
		if @element.update_attributes(elem_params)
			render json: @element
		else
			#todo
		end
	end
	private
	def elem_params
			params.require(:element).permit(:content, 
				:brief_id, :id)
		end
end
