class AudiencesController < ApplicationController
		 respond_to :json
	def create
		
		@audience = Audience.new(aud_params)
		if @audience.save
			render json: @audience
		else
			# render json: @brief.errors.full_messages
		end
	end
	def index
		@brief = Brief.find(params[:id])
		@audience = @brief.audiences.to_json
		render json: @audience
	end
	def update
		@audience = Audience.find(params[:audience][:id])
		if @audience.update_attributes(aud_params)
			render json: @audience
		else
			#todo
		end
	end
	def delete
		@audience = Audience.find(params[:id])
		@readable = { id: @audience.id, attribute: "audience"}
		if @audience.destroy
			render json: @readable
		else
			render json: @audience
		end
	end
	private
	def aud_params
			params.require(:audience).permit(:description, 
				:brief_id)
		end
end
