class SpacesController < ApplicationController

  def show
    @space = Space.find(params[:id])
  end

  def create
    @space = current_user.create_space(space_params)
    redirect_to @space
  end

  def update
    @space = Space.find(params[:id])
    @space.update(space_params)
    render @space
  end

  def destroy
    @space = Space.find(params[:id])
    @space.destroy
    redirect_to root_url
  end

  private
  def space_params
    params.require(:space).permit(:name)
  end

end