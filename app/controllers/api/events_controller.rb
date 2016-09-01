class Api::EventsController < ApplicationController

  def index
    @events = Event.where(application_id: params[:application_id])
                   .order('date_time')
  end

  def filtered
    filter = params[:filter].values.first.to_i
    @events = Event.by_month(filter)
    render "api/events/index"
  end

  def show
    @event = Event.find_by_id(params[:id])
  end

  def create
    @event = Event.new(event_params)
    if @event.save
			render "api/events/show"
		else
			render json: @event.errors.full_messages, status: 422
		end
  end

  def update
    @event = Event.find_by_id(event_params[:id])
    if @event.update_attributes(event_params)
      render "api/events/show"
    else
      render json: @event.errors.full_messages, status: 422
    end
  end

  def destroy
    @event = Event.find_by_id(params[:id])
    if(@event.destroy)
      render "api/events/show", status: 200
    else
      render json: @event.errors.full_messages, status: 422
    end
  end

  private

  def event_params
    params.require(:event).permit(:title, :date_time, :notes, :application_id)
  end
end
