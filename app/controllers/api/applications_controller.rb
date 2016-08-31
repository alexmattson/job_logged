class Api::ApplicationsController < ApplicationController
  def index
    @applications = Application.where(user_id: current_user.id)
  end

  def create

  end
end
