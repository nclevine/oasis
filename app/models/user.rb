class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_one :space
  has_one :journal

  def fullname
    "#{self.firstname} #{self.lastname}"
  end

  def username
    self.email.split('@').first
  end
  
end
