class HomeController < ApplicationController
  skip_before_action :authenticate_user!
  
  def home
    if user_signed_in?
      @welcome_message = 'Welcome '
      if current_user.firstname
        @welcome_message << current_user.firstname
      else
        @welcome_message << current_user.username
      end
    end
  end

end
