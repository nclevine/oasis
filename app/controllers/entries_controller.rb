class EntriesController < ApplicationController

  def index
    @journal = current_user.journal
    @entries = @journal.entries
    render json: @entries
  end

  def show
    @entry = Entry.find(params[:id])
    render json: @entry
  end

  def create
    @entry = current_user.journal.entries.create(entry_params)
  end

  def update
    @entry = Entry.find(params[:id])
    @entry.update(entry_params)
    render json: @entry
  end

  def destroy
    @entry = Entry.find(params[:id])
    @entry.destroy
    render nothing: true
  end

  private
  def entry_params
    params.require(:entry).permit(:body)
  end

end