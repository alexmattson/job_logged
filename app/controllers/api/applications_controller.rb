class Api::ApplicationsController < ApplicationController
  def index
    @applications = Application.includes(:contact)
                               .where(user_id: current_user.id)
  end

  def show
    @application = Application.includes(:contact)
                              .find_by_id(params[:id])
  end

  def create
    @application = Application.new(application_params)
    @application.user_id = current_user.id
    if @application.save
      # @applications = Application.all
			render "api/applications/show"
		else
			render json: @application.errors.full_messages, status: 422
		end
  end

  def update
    @application = Application.find_by_id(application_params[:id])
    if @application.update_attributes(application_params)
      render "api/applications/show"
    else
      render json: @application.errors.full_messages, status: 422
    end
  end

  def destroy
    @application = Application.find_by_id(params[:id])
    if(@application.destroy)
      render "api/applications/show", status: 200
    else
      render json: @application.errors.full_messages, status: 422
    end
  end

  private

  def application_params
    params.require(:application).permit(:id, :company, :job_title, :progress)
  end
end
