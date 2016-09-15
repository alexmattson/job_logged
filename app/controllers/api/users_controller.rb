class Api::UsersController < ApplicationController

	def create
		@user = User.new(user_params)

		if @user.save
			CoverLetter.create({user_id: @user.id, cover_letter: CoverLetter.default})
			debugger
			login(@user)
			render "api/users/show"
		else
			render json: @user.errors.full_messages, status: 422
		end
	end

	private

	def user_params
		params.require(:user).permit(:username, :password)
	end

end
