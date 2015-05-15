class UsersController < ApplicationController

  def show
    @user = current_user
    if !@user.space
      @space = Space.new
    end
    if @user.firstname
      if @user.lastname
        @welcome = @user.fullname
      else
        @welcome = @user.firstname
      end
    else
      @welcome = @user.username
    end
  end

  def update
    @user = current_user
    @user.update(user_params)
    redirect_to current_user
  end

  private
  def user_params
    params.require(:user).permit(:firstname, :lastname)
  end

end