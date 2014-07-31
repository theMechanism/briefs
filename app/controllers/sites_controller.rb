class SitesController < ApplicationController
		 respond_to :json
	def create
		
		@site = Site.new(site_params)
		if @site.save
			render json: @site
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
		@site = Site.find(params[:site][:id])
		if @site.update_attributes(site_params)
			render json: @site
		else
			#todo
		end
	end
	def delete
		@site = Site.find(params[:id])
		@readable = { id: @site.id, attribute: "sites"}
		if @site.destroy
			render json: @readable
		else
			render json: @site
		end
	end
	private
	def site_params
			params.require(:site).permit(:name, 
				:brief_id)
		end
end
