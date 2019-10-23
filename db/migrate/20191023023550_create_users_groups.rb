class CreateUsersGroups < ActiveRecord::Migration[5.0]
  def change
    create_table :users_groups do |t|
      t.integer :user_id,  null: false, foreign_key: true
      t.integer :group_id, null: false, foreign_key: true
      t.timestamps
    end
  end
end
