class JournalsController < ApplicationController

  def show
    @journal = current_user.journal
    render @journal
  end

  def create
    @journal = current_user.journal.create(journal_params)
    render @journal
  end

  def update
    @journal = Journal.find(params[:id])
    render @journal
  end

  def destroy
    @journal = Journal.find(params[:id])
    @journal.destroy
    redirect_to current_user.space
  end

  private
  def journal_params
    params.require(:journal).permit(:coverURL)
  end

end