class QuestionsController < ApplicationController
	 respond_to :json

	
	def create
	
		binding.pry
		if @brief.save
			render json: @brief
		else
			render json: @brief.errors.full_messages
		end
	end
	private
		def question_params
			params.require(:question).permit(:content,:brief_id
		end
end
