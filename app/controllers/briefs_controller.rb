class BriefsController < ApplicationController
	 respond_to :json
	def index
		@briefs = Brief.all.to_json(:include => [:elements, :sites, :audiences])
		render json: @briefs
	end
	def show
		
		render json: Brief.find(params[:id])
	end
	def update
	
		@brief = Brief.find(params[:id])
		if @brief.update_attributes(brief_params)
			render json: @brief
		end

	end
	def create
		@brief = Brief.new(brief_params)

		if @brief.save
			render json: @brief
		else
			render json: @brief.errors.full_messages
		end
	end
	private
		def brief_params
			params.require(:brief).permit(:name, 
				:instructions, 
				:issue_date,
				:due_date,
				:contact_name, 
				:contact, 
				:website, 
				:budget, 
				:questions,
				:type_of_work,
				:client_information,
				:purpose,
				:competitors,
				:internal_res)
		end
end
