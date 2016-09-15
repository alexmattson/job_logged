class Api::CoverLettersController < ApplicationController
  def index
    @cover_letter = CoverLetter.find_by_user_id(current_user.id)
    render "api/cover_letters/show"
  end

  def update
    @cover_letter = CoverLetter.find_by_id(params[:id])
    if @cover_letter.update_attributes({cover_letter: params[:cover_letter]})
      render "api/cover_letters/show"
    else
      render json: @cover_letter.errors.full_messages, status: 422
    end
  end

  private

  def cover_letter_params

  end
end
