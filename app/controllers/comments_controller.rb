class CommentsController < ApplicationController
		 respond_to :json
	def create

		@comment = Comment.new(comment_params)
		@comment.brief_id = params[:id]
		if @comment.save
			render json: @comment
		else
			render json: @comment.errors.full_messages
		end
	end
	def index
		@brief = Brief.find(params[:id])
		@comments = @brief.comments.to_json			
		render json: @comments
	end
	private
	def comment_params
		params.require(:comment).permit(:sectionId, :comment, :authorAvatarUrl, :authorName)
	end
end
