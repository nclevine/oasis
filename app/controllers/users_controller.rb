class UsersController < ApplicationController

  def show
    @user = current_user
    if !@user.space {@space = Space.new}
  end

end