class Api::EventsController < ApplicationController

  def index
    @events = Event.where(application_id: params[:application_id])
                   .order('date_time')
  end

  def filtered
    @events = Event.joins(:application)
                   .where("applications.user_id =  #{params['user_id']}")
    render "api/events/index"
  end

  def show
    @event = Event.find_by_id(params[:id])
  end

  def create
    formattedParams = event_params
    formattedParams[:date_time] = DateTime.parse(event_params[:date_time])
    @event = Event.new(formattedParams)
    if @event.save
			render "api/events/show"
		else
			render json: @event.errors.full_messages, status: 422
		end
  end

  def update
    @event = Event.find_by_id(event_params[:id])
    formattedParams = event_params
    formattedParams[:date_time] = DateTime.parse(event_params[:date_time])
    if @event.update_attributes(formattedParams)
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
    params.require(:event).permit(:title,
                                  :date_time,
                                  :notes,
                                  :application_id,
                                  :id,
                                  :event_type)
  end
end
