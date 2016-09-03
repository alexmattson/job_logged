class Api::ContactsController < ApplicationController
  def create
    @contact = Contact.new(contact_params)
    if @contact.save
			render "api/contacts/show"
		else
			render json: @contact.errors.full_messages, status: 422
		end
  end

  def update
    @contact = Contact.find_by_id(contact_params[:id])
    if @contact.update_attributes(contact_params)
      render "api/contacts/show"
    else
      render json: @contact.errors.full_messages, status: 422
    end
  end

  private

  def contact_params
    params.require(:contact).permit(:lname,
                                    :fname,
                                    :phone,
                                    :email,
                                    :address,
                                    :application_id)
  end
end
