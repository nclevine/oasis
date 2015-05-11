class UsersController < ApplicationController

  def show
    @user = current_user
    if @user.space
      redirect_to @user.space
    else
      @space = Space.new
    end
  end

end